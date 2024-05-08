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
import { useToast } from "@/components/ui/use-toast";
import { Edit } from "lucide-react";

export default function EditButton({ id, getData }) {
  const { toast } = useToast();

  async function handleEdit(id) {
    // const result = await editMemberById(id);
    // const jsonResult = JSON.parse(result);
    // if (jsonResult.error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: jsonResult.error,
    //     action: <ToastAction altText="Try again">Try again</ToastAction>,
    //   });
    // } else {
    //   toast({
    //     variant: "success",
    //     title: "Success!",
    //     description: `Edited client with id: ${id}`,
    //   });
    //   getData();
    // }
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="smallerIcon">
            <Edit className="h-4 w-4"></Edit>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to edit?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently edit the client's account data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleEdit(id);
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
