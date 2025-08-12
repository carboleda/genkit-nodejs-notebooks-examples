import { startFlowServer } from "@genkit-ai/express";
import { travelPlanFlow } from "./travel-flow";

// https://genkit.dev/docs/deploy-node/
startFlowServer({
  port: 5001,
  flows: [travelPlanFlow],
});

/*
curl -X POST "http://127.0.0.1:5001/travelItinerary" \
  -H "Content-Type: application/json" \
  -d '{"data": {"travelPlan": "I will visit Paris next October 2025 for a week."}}'
*/
