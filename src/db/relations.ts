import { relations } from "drizzle-orm";
import { dashboards, widgets } from "@db/schema";

export const dashboardRelations= relations( dashboards, ({ many })=> ({
  widgets: many( widgets )
}));

export const widgetRelations= relations( widgets, ({ one })=> ({
  dashboard: one( dashboards, {
    fields: [ widgets.dashboardId ],
    references: [ dashboards.id ]
  })
}));
