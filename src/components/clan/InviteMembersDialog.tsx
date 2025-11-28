import { useMemo, useState, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
 
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

type InviteMembersDialogProps = {
  groupId: string;
  groupName?: string;
  trigger: ReactNode;
  onInvited?: () => void;
};

const normalizeEmails = (value: string) =>
  value
    .split(/[\n,;]/)
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

const deriveInviteeName = (email: string) => {
  const localPart = email.split("@")[0] ?? "Player";
  const pretty = localPart.replace(/[\W_]+/g, " ").trim();
  return pretty.length ? pretty : "Player";
};

export const InviteMembersDialog = ({
  groupId,
  groupName,
  trigger,
  onInvited,
}: InviteMembersDialogProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [emails, setEmails] = useState("");
  const [inviterUserId, setInviterUserId] = useState("");
  const [eventType, setEventType] = useState("");

  const parsedEmails = useMemo(() => normalizeEmails(emails), [emails]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () =>
      groupApi.inviteMembers({
        groupId,
        groupName,
        inviterUserId: inviterUserId || undefined,
        invites: parsedEmails.map((email) => ({
          inviteeEmail: email,
          inviteeName: deriveInviteeName(email),
          eventType: eventType ? Number(eventType) : undefined,
        })),
      }),
    onSuccess: () => {
      toast.success("Invites sent");
      queryClient.invalidateQueries({ queryKey: ["group-info", groupId] });
      onInvited?.();
      setOpen(false);
      setEmails("");
      setInviterUserId("");
      setEventType("");
    },
    onError: (err: Error) => toast.error(err.message || "Failed to invite users"),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!parsedEmails.length) return;
    await mutateAsync();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !isPending && setOpen(next)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Invite members</DialogTitle>
            <DialogDescription>
              Share comma or line separated email addresses. Everyone will receive an invite to{" "}
              {groupName ?? "this clan"}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="emails">Emails</Label>
            <Textarea
              id="emails"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="elon@example.com, jane@example.com"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Separate values with comma, semicolon, or new line.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventType">Event type (optional)</Label>
            <Input
              id="eventType"
              type="number"
              placeholder="Enter numeric event type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inviterUserId">Your user ID (optional)</Label>
            <Input
              id="inviterUserId"
              placeholder="Only needed on legacy environments"
              value={inviterUserId}
              onChange={(e) => setInviterUserId(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!parsedEmails.length || isPending} className="w-full">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send invites
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMembersDialog;

