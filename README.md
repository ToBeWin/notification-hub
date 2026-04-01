# Notification Hub

Unified notification center for OpenClaw.

## Features

- Add notifications from any source
- List and filter notifications
- Set reminders with automatic alerts
- Track notification statistics

## Installation

```bash
openclaw plugins install clawhub:@tobewin/notification-hub
```

Or from local path:

```bash
openclaw plugins install /path/to/notification-hub
```

## Usage

### Tools

| Tool | Description |
|------|-------------|
| `notification_add` | Add a notification |
| `notification_list` | List notifications |
| `notification_mark_read` | Mark notifications as read |
| `notification_stats` | Get notification statistics |
| `reminder_add` | Add a reminder |
| `reminder_list` | List upcoming reminders |

### Example

```
User: "Add notification: source=system, title=Alert, content=New message"
Agent: Calls notification_add tool

User: "查看通知"
Agent: Calls notification_list tool
```

## Background Service

The plugin includes a background service that checks reminders every minute and creates notifications when they trigger.

## Configuration

No configuration required. The plugin works out of the box.

## License

MIT-0
