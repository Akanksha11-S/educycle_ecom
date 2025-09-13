"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-lg text-center">
            <CardHeader>
                <CardTitle className="text-destructive font-headline text-2xl">Admin Panel Error</CardTitle>
                <CardDescription>Something went wrong in this section.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">An unexpected error occurred. You can try to recover by clicking the button below.</p>
                <Button onClick={() => reset()}>
                    Try again
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
