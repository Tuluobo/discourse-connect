import { getAllApplications } from "@/lib/dto/application";
import ApplicationView from "@/components/application/view";

export default async function ApplicationPage() {
  const applications = (await getAllApplications()) || [];
  return <ApplicationView data={applications} />;
}
