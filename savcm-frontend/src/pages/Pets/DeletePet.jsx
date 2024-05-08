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
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { deletePetById } from "@/lib/supabase/pet-service";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Delete } from "lucide-react";

export default function DeletePet({ id, getData }) {
  const { toast } = useToast();

  async function handleDelete(id) {
    // console.log(id);
    toast({
      title: "Deleting pet record",
      description: `Please wait while we delete the pet record with id: ${id}`,
    });

    const result = await deletePetById(id);
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
        description: `Deleted pet record with id: ${id}`,
        // description: (
        //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">`Deleted client with id: ${id}`</code>
        //   </pre>
        // ),
      });

      // Refresh the page
      //   window.location.reload();
      getData();
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
              pet's record and remove the data from our servers.
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
