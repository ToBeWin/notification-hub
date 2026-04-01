import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";

// In-memory storage
const notifications: any[] = [];
const reminders: any[] = [];

// Helper: Generate ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export default definePluginEntry({
  id: "notification-hub",
  name: "Notification Hub",
  description: "Unified notification center",

  register(api) {
    // Tool: Add notification
    api.registerTool({
      name: "notification_add",
      description: "Add a notification",
      parameters: {
        type: "object",
        properties: {
          source: { type: "string", description: "Source" },
          title: { type: "string", description: "Title" },
          content: { type: "string", description: "Content" },
          priority: { type: "string", description: "Priority" }
        }
      },
      async execute(_id: any, params: any) {
        const notification = {
          id: generateId(),
          timestamp: new Date().toISOString(),
          source: params.source || "unknown",
          title: params.title || "No title",
          content: params.content || "No content",
          priority: params.priority || "normal",
          read: false
        };
        notifications.unshift(notification);
        return { content: [{ type: "text", text: `Added: ${notification.id}` }] };
      }
    });

    // Tool: List notifications
    api.registerTool({
      name: "notification_list",
      description: "List notifications",
      parameters: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Limit" }
        }
      },
      async execute(_id: any, params: any) {
        const limit = params?.limit || 10;
        const list = notifications.slice(0, limit);
        const text = list.map((n: any) => `[${n.priority}] ${n.title}`).join("\n") || "No notifications";
        return { content: [{ type: "text", text }] };
      }
    });

    // Tool: Stats
    api.registerTool({
      name: "notification_stats",
      description: "Get stats",
      parameters: { type: "object", properties: {} },
      async execute() {
        const unread = notifications.filter((n: any) => !n.read).length;
        return { content: [{ type: "text", text: `Notifications: ${unread} unread` }] };
      }
    });

    api.logger.info("Notification Hub registered");
  }
});
