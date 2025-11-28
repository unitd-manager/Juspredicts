import { useMemo, useState, type ReactNode } from "react";
import { useMutation } from "@tanstack/react-query";
import { Ban, Loader2 } from "lucide-react";

import { groupApi } from "@/api/group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

type CancelInviteDialogProps = {
  groupId: string;
  trigger: ReactNode;
  onCancelled?: () => void;
};

const parseEmails = (value: string) =>
  value
    .split(/[\n,;]/)
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

export const CancelInviteDialog = ({ groupId, trigger, onCancelled }: CancelInviteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState("");

  const normalizedEmails = useMemo(() => parseEmails(emails), [emails]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => groupApi.cancelInvite({ groupId, emailId: normalizedEmails }),
    onSuccess: () => {
      toast.success("Invitations cancelled");
      onCancelled?.();
      setOpen(false);
      setEmails("");
    },
    onError: (err: Error) => toast.error(err.message || "Unable to cancel invites"),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!normalizedEmails.length) return;
    await mutateAsync();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isPending && setOpen(next)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Cancel pending invites</DialogTitle>
            <DialogDescription>
              Type the email IDs whose invitations you want to revoke. This only affects users who
              have not accepted yet.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="emailList">Email IDs</Label>
            <Textarea
              id="emailList"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              rows={4}
              placeholder="elon@example.com"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!normalizedEmails.length || isPending} variant="destructive">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <Ban className="mr-2 h-4 w-4" />
                  Cancel invites
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CancelInviteDialog;

