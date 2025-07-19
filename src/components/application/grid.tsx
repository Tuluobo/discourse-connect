import { Application } from "@/lib/dto/application";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function ApplicationGrid({ data }: { data: Application[] }) {
  return (
    <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
      {data.map((app) => (
        <li key={app.name} className="rounded-lg border p-4 hover:shadow-md">
          <div className="mb-8 flex items-center justify-between">
            <div
              className={`bg-muted flex size-10 items-center justify-center rounded-lg p-2`}
            >
              {app.logoUri && (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={app.logoUri} />
                  <AvatarFallback className="rounded-lg">
                    {app.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`${app.isActived ? "border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900" : ""}`}
            >
              {app.isActived ? "Actived" : "Not Actived"}
            </Button>
          </div>
          <div>
            <h2 className="mb-1 font-semibold">{app.name}</h2>
            <p className="line-clamp-2 text-gray-500">{app.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
