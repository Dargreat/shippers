import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

interface Submission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string | null;
  country: string | null;
  volume: string | null;
  created_at: string;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }

      // Verify admin role
      const { data: roles } = await supabase
        .from("user_roles" as any)
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        navigate("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("waitlist_submissions" as any)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to load submissions.");
      } else {
        setSubmissions((data as any) || []);
      }
      setLoading(false);
    };
    checkAuthAndFetch();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-foreground">
              <span className="text-primary">Shippers</span> Africa Admin
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Waitlist submissions ({submissions.length})</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-primary hover:underline">← Back to site</a>
            <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
              Sign out
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        ) : submissions.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet.</p>
        ) : (
          <div className="border border-border rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary">
                  <TableHead className="font-display text-xs font-bold tracking-wider uppercase">Name</TableHead>
                  <TableHead className="font-display text-xs font-bold tracking-wider uppercase">Email</TableHead>
                  <TableHead className="font-display text-xs font-bold tracking-wider uppercase">Company</TableHead>
                  <TableHead className="font-display text-xs font-bold tracking-wider uppercase">Country</TableHead>
                  <TableHead className="font-display text-xs font-bold tracking-wider uppercase">Volume</TableHead>
                  <TableHead className="font-display text-xs font-bold tracking-wider uppercase">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.first_name} {s.last_name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell className="text-muted-foreground">{s.company || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{s.country || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{s.volume || "—"}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
