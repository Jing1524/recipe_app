
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { Button } from "@/components/ui/button"

  import { Key } from "react";
  import { useRouter } from 'next/navigation';

  type RecipeCardProp = {
      title:string,
      image:string,
      id:Key
  }

  const RecipeCard = ({id, title, image}: RecipeCardProp) => {
    const router = useRouter();
    
    return (
      <Card className="overflow-hidden hover:bg-slate-200 hover:cursor-pointer" onClick = {()=> router.push(`/recipes/${id}`)}>
        <CardContent>
          <img
            src={image}
            height={400}
            width={400}
            alt="recipeImg"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start mt-4 gap-2">
        <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <CardTitle className="w-[252px] truncate">{title}</CardTitle>
        </TooltipTrigger>
        <TooltipContent align="start" side="bottom">
          <p className="text-sm">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
        
         
        </CardFooter>
      </Card>
    );
  };
  
  export default RecipeCard;
  