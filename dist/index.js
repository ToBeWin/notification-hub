import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
// In-memory storage
const notifications = [];
const reminders = [];
// Helper: Generate ID
function generateId() {
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
                    priority: { type: "string", description: "Priority (high/normal/low)" }
                }
            },
            async execute(_id, params) {
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
                return {
                    content: [{ type: "text", text: `Added: ${notification.id}` }],
                    details: `Added notification: ${notification.title}`
                };
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
            async execute(_id, params) {
                const limit = params?.limit || 10;
                const list = notifications.slice(0, limit);
                const text = list.map((n) => `[${n.priority}] ${n.title}: ${n.content}`).join("\n") || "No notifications";
                return {
                    content: [{ type: "text", text }],
                    details: `Listed ${list.length} notifications`
                };
            }
        });
        // Tool: Mark as read
        api.registerTool({
            name: "notification_mark_read",
            description: "Mark notifications as read",
            parameters: {
                type: "object",
                properties: {
                    all: { type: "boolean", description: "Mark all" }
                }
            },
            async execute(_id, params) {
                if (params?.all) {
                    notifications.forEach(n => n.read = true);
                }
                return {
                    content: [{ type: "text", text: "Marked as read" }],
                    details: "Notifications marked as read"
                };
            }
        });
        // Tool: Stats
        api.registerTool({
            name: "notification_stats",
            description: "Get stats",
            parameters: { type: "object", properties: {} },
            async execute() {
                const unread = notifications.filter((n) => !n.read).length;
                const high = notifications.filter((n) => n.priority === "high").length;
                const text = `Total: ${notifications.length} | Unread: ${unread} | High: ${high}`;
                return {
                    content: [{ type: "text", text }],
                    details: `Stats: ${notifications.length} total, ${unread} unread`
                };
            }
        });
        // Tool: Add reminder
        api.registerTool({
            name: "reminder_add",
            description: "Add a reminder",
            parameters: {
                type: "object",
                properties: {
                    title: { type: "string", description: "Title" },
                    content: { type: "string", description: "Content" },
                    trigger_time: { type: "string", description: "ISO timestamp" }
                }
            },
            async execute(_id, params) {
                const reminder = {
                    id: generateId(),
                    title: params.title || "Reminder",
                    content: params.content || "",
                    triggerTime: new Date(params.trigger_time || new Date().toISOString()),
                    triggered: false
                };
                reminders.push(reminder);
                return {
                    content: [{ type: "text", text: `Reminder set: ${reminder.id}` }],
                    details: `Reminder set: ${reminder.title}`
                };
            }
        });
        // Tool: List reminders
        api.registerTool({
            name: "reminder_list",
            description: "List upcoming reminders",
            parameters: { type: "object", properties: {} },
            async execute() {
                const upcoming = reminders.filter((r) => !r.triggered);
                const text = upcoming.map((r) => `- ${r.title} (${r.triggerTime.toLocaleString()})`).join("\n") || "No upcoming reminders";
                return {
                    content: [{ type: "text", text }],
                    details: `Listed ${upcoming.length} upcoming reminders`
                };
            }
        });
        // Hook: before_tool_call
        api.registerHook(["before_tool_call"], async (event) => {
            api.logger.info(`Tool called: ${event.toolName}`);
            return {};
        }, { name: "notification-hub.onToolCall" });
        // Service: Check reminders
        api.registerService({
            name: "reminder-checker",
            async start() {
                setInterval(() => {
                    const now = new Date();
                    reminders.forEach((reminder) => {
                        if (!reminder.triggered && reminder.triggerTime <= now) {
                            reminder.triggered = true;
                            notifications.unshift({
                                id: generateId(),
                                timestamp: now.toISOString(),
                                source: "reminder",
                                title: `Reminder: ${reminder.title}`,
                                content: reminder.content,
                                priority: "high",
                                read: false
                            });
                            api.logger.info(`Reminder triggered: ${reminder.title}`);
                        }
                    });
                }, 60000);
            },
            async stop() { }
        });
        api.logger.info("Notification Hub plugin registered");
    }
});
