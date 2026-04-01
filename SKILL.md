---
name: notification-hub
description: Unified notification center for OpenClaw. Collect, classify, summarize, and manage notifications from all channels. Supports scheduled reminders, notification rules, quiet hours, and smart classification. This is a Plugin, install with openclaw plugins install.
version: 1.0.0
license: MIT-0
metadata: {"openclaw": {"emoji": "🔔", "requires": {"bins": ["node"], "env": []}, "minVersion": "2026.3.22"}}
---

# Notification Hub

Unified notification center for OpenClaw Plugin.

## ⚠️ Installation

This is a **Plugin**, not a Skill. Install with:

```bash
# From npm (when published)
openclaw plugins install @tobewin/notification-hub

# From local path
openclaw plugins install /path/to/notification-hub
```

## Features

- 📬 **Notification Collection**: Collect notifications from all channels
- 🏷️ **Auto Classification**: Auto-classify by priority (high/normal/low)
- ⏰ **Scheduled Reminders**: Set reminders that trigger automatically
- 📊 **Notification Summary**: Generate daily/weekly summaries
- 🔕 **Quiet Hours**: Mute notifications during specified hours
- 📋 **Custom Rules**: Define notification classification rules

## Tools

| Tool | Description |
|------|-------------|
| `notification_add` | Add a notification |
| `notification_list` | List notifications |
| `notification_mark_read` | Mark as read |
| `notification_summary` | Generate summary |
| `notification_stats` | Get statistics |
| `reminder_add` | Add reminder |
| `reminder_list` | List reminders |
| `reminder_delete` | Delete reminder |
| `notification_rule_add` | Add classification rule |
| `notification_quiet_hours` | Configure quiet hours |

## Commands

- `/notifications` - Quick notification overview
- `/remind <time> <message>` - Quick reminder setup

## Usage Examples

```
User: "Set a reminder for tomorrow at 3pm for meeting"
Agent: Uses reminder_add tool

User: "Summarize today's notifications"
Agent: Uses notification_summary tool

User: "Set DingTalk notifications as high priority"
Agent: Uses notification_rule_add tool

User: "Mute all notifications from 10pm to 8am"
Agent: Uses notification_quiet_hours tool
```

## Data Storage

Notifications are stored in `~/.openclaw/notification-hub.json`.

## License

MIT-0
