export type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  extendedIngredients: Ingredient[];
  analyzedInstructions: { steps: Step[] }[];
  summary:string
};



type Step = {
  number: number;
  step: string;
  
};

type Ingredient = {
  id: number;
  aisle: string | null;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
};
