import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, json, useLoaderData } from "@remix-run/react";
import { ArrowRight } from "lucide-react";
import { $path } from "remix-routes";

export function loader() {
  return json({
    proposals: [
      { id: "11db41f5d1671deb24fa9b7a1ab486c4fd474c986f1feda58ea7de5f474c5316" },
      { id: "def0f467480cea0211e937f75b00219cac6e8d21b0535acf70e402e33ebc81e8" },
    ],
  });
}

export default function Index() {
  const { proposals } = useLoaderData<typeof loader>();

  return (
    <div className="mt-10">
      <Card className="pb-10">
        <CardHeader>
          <CardTitle>Active Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            {proposals.map((proposal) => (
              <Link
                key={proposal.id}
                className="flex"
                to={$path("/app/proposals/:id", { id: proposal.id })}
              >
                <Button className="flex flex-1 justify-between pr-4" variant="outline">
                  <span />
                  <span>{proposal.id}</span>
                  <ArrowRight />
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}