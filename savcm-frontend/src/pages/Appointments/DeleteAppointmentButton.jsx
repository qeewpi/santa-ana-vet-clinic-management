import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { deleteAppointmentById } from "@/lib/supabase/appointment-service";
import { Delete } from "lucide-react";

export default function DeleteAppointmentButton({ id, getData }) {
  const { toast } = useToast();

  async function handleDelete(id) {
    toast({
      title: "Deleting appointment",
      description: `Please wait while we delete the appointment with id: ${id}`,
    });

    const result = await deleteAppointmentById(id);
    const jsonResult = JSON.parse(result);

    if (jsonResult.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: jsonResult.error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      toast({
        variant: "success",
        title: "Success!",
        description: `Deleted appointment with id: ${id}`,
      });

      getData(); // Refresh appointment data
    }
  }

  return (
    <div>
      <AlertDialog>
        <TooltipProvider>
          <Tooltip>
            <AlertDialogTrigger asChild>
              <TooltipTrigger>
                <Button variant="outline" size="smallerIcon">
                  <Delete className="h-4 w-4"></Delete>
                </Button>
              </TooltipTrigger>
            </AlertDialogTrigger>

            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              appointment and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDelete(id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
