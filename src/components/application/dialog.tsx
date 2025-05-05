import { ApplicationsActionDialog } from "./action-dialog";
import { useApplications } from "./context";
import { ApplicationsDeleteDialog } from "./delete-dialog";

export function ApplicationsDialogs() {
  const { open, setOpen, currentApplication, setCurrentApplication } =
    useApplications();
  return (
    <>
      <ApplicationsActionDialog
        key="user-add"
        open={open === "create"}
        onOpenChange={() => setOpen("create")}
      />

      {currentApplication && (
        <>
          <ApplicationsActionDialog
            key={`user-edit-${currentApplication.id}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentApplication(null);
              }, 500);
            }}
            currentApplication={currentApplication}
          />

          <ApplicationsDeleteDialog
            key={`user-delete-${currentApplication.id}`}
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentApplication(null);
              }, 500);
            }}
            currentApplication={currentApplication}
          />
        </>
      )}
    </>
  );
}
