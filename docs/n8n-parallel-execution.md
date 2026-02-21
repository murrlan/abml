# n8n Parallel Execution Guide

## The Problem

When you connect nodes one after another, they run **sequentially** (one waits for the other to finish).

## The Solution

Connect **both nodes from the same source node** to run them **in parallel** (both run at the same time).

## Visual Comparison

### ❌ Sequential (Wrong) - Runs One After Another

```
Code (Parse)
  ↓
HTTP Request (Discord)  ← Runs first
  ↓
HTTP Request (SendGrid) ← Waits, then runs second
```

**Time:** ~2 seconds (1s + 1s)

### ✅ Parallel (Correct) - Runs At The Same Time

```
Code (Parse)
  ├─→ HTTP Request (Discord)   ← Both start
  └─→ HTTP Request (SendGrid)  ← at the same time
```

**Time:** ~1 second (both run simultaneously)

## How to Connect Nodes in Parallel

### Step-by-Step:

1. **Add your first HTTP Request node** (Discord)
   - Connect it from the Code node
   - Configure it

2. **Add your second HTTP Request node** (SendGrid)
   - **Important:** Connect it **directly from the Code node** (same source)
   - Do NOT connect it from the first HTTP Request node
   - Drag from Code node's output dot to SendGrid node's input dot

3. **Verify the connections:**
   - Code node should have **TWO output connections**
   - Both HTTP Request nodes should connect **directly to Code**
   - They should NOT be connected to each other

## Visual Guide in n8n UI

When done correctly, your workflow canvas should show:

```
┌─────────┐
│ Webhook │
└────┬────┘
     │
     ▼
┌─────────┐
│  Code   │
└────┬────┘
     │
     ├─────────────────┐
     │                 │
     ▼                 ▼
┌──────────┐    ┌──────────┐
│ Discord  │    │ SendGrid │
│ Request  │    │ Request  │
└──────────┘    └──────────┘
```

Both arrows come FROM the Code node, not from each other.

## How to Fix If Already Connected Wrong

1. **Delete the connection** between the two HTTP Request nodes
2. **Add a new connection** from Code node to the second HTTP Request node
3. Both should now connect directly from Code

## Verifying Parallel Execution

1. **Check execution time:**
   - Sequential: Total time = sum of both requests
   - Parallel: Total time ≈ longest single request

2. **Check execution logs:**
   - Both nodes should show similar start times
   - They should not wait for each other

3. **Visual check:**
   - Both nodes should have the same "parent" (Code node)
   - No chain between them

## Advanced: Waiting for All to Complete

If you need to wait for all parallel nodes to finish before continuing:

1. Add a **"Wait"** node
2. Connect both HTTP Request nodes to the Wait node
3. Configure Wait node to wait for all inputs
4. Continue with next steps after Wait node

Example:
```
Code
├─→ Discord Request ──┐
└─→ SendGrid Request ─┼─→ Wait → Next Step
```

## Common Mistakes

1. **Connecting in a chain:** Code → Node1 → Node2 (sequential)
2. **Connecting from wrong source:** Connecting from Node1 instead of Code
3. **Not realizing they're parallel:** n8n runs them automatically when connected correctly

## Tips

- **n8n automatically runs parallel nodes** - no special configuration needed
- **Multiple connections from one node = parallel execution**
- **Chain connections = sequential execution**
- **You can have 3, 4, or more parallel nodes** - just connect them all from the same source

