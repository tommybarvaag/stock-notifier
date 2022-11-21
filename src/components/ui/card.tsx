import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...other }: CardProps) {
  return (
    <div
      className={cn("overflow-hidden rounded-lg border", className)}
      {...other}
    />
  );
}

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

Card.Header = function CardHeader({ className, ...other }: CardHeaderProps) {
  return <div className={cn("grid gap-1 p-6", className)} {...other} />;
};

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

Card.Content = function CardContent({ className, ...other }: CardContentProps) {
  return <div className={cn("px-6 pb-4", className)} {...other} />;
};

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

Card.Footer = function CardFooter({ className, ...other }: CardFooterProps) {
  return (
    <div
      className={cn("border-t bg-slate-50 px-6 py-4", className)}
      {...other}
    />
  );
};

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

Card.Title = function CardTitle({ className, ...other }: CardTitleProps) {
  return <h4 className={cn("text-lg font-medium", className)} {...other} />;
};

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

Card.Description = function CardDescription({
  className,
  ...other
}: CardDescriptionProps) {
  return <p className={cn("text-sm text-gray-600", className)} {...other} />;
};

Card.Skeleton = function CardSeleton() {
  return (
    <Card>
      <Card.Header className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </Card.Header>
      <Card.Content className="h-10" />
      <Card.Footer>
        <Skeleton className="h-8 w-[120px] bg-slate-200" />
      </Card.Footer>
    </Card>
  );
};
