# SendGrid Node Troubleshooting

## Common Issues and Solutions

### Issue: "Authentication failed" or "Invalid API key"

**Solution:**
1. Verify your SendGrid API key is correct
2. Make sure the API key starts with `SG.`
3. Check that the API key has "Mail Send" permissions enabled in SendGrid
4. Regenerate the API key if needed

**How to check API key:**
- Go to SendGrid Dashboard → Settings → API Keys
- Verify the key has "Full Access" or at least "Mail Send" permission

### Issue: "From email address is not verified"

**Solution:**
1. The "From Email" must be verified in SendGrid
2. For free accounts, you need to verify the sender email
3. Go to SendGrid → Settings → Sender Authentication
4. Verify your email address or domain

**Quick fix:**
- Use a verified email address
- Or set up domain authentication in SendGrid

### Issue: "Email format error" or "Invalid recipient"

**Solution:**
1. Check that `{{ $json.email }}` is correctly pulling the email
2. Test the expression by executing the Code node first
3. Verify the email format is valid (contains @)

**Debug:**
- Add a temporary node to log `{{ $json.email }}`
- Check execution data to see what value is being used

### Issue: Node not sending emails

**Solution:**
1. Check execution logs in n8n
2. Look for specific error messages
3. Verify the workflow is active
4. Test the SendGrid node individually using "Execute Node"

### Issue: "Rate limit exceeded"

**Solution:**
1. SendGrid free tier has limits (100 emails/day)
2. Check your SendGrid dashboard for usage
3. Wait for rate limit to reset or upgrade plan

## Switching from HTTP Request to SendGrid Node

If you're having issues with HTTP Request node:

1. **Delete the HTTP Request node** (or keep it disabled)
2. **Add SendGrid node** instead
3. **Connect from Code node** (same as before)
4. **Configure credentials:**
   - Click "Create New Credential"
   - Select "SendGrid API"
   - Paste your API key
   - Save
5. **Fill in email fields:**
   - From: Your verified email
   - To: `{{ $json.email }}`
   - Subject: Your subject
   - Message: Your message

## Testing the SendGrid Node

1. **Execute the Code node first** to generate test data
2. **Execute the SendGrid node** individually
3. **Check execution output** for success/errors
4. **Verify email received** in the recipient's inbox

## Best Practices

1. **Always verify sender email** in SendGrid first
2. **Test with your own email** before using in production
3. **Use expressions** like `{{ $json.email }}` for dynamic data
4. **Check execution logs** if emails aren't sending
5. **Monitor SendGrid dashboard** for delivery status

## Getting Your SendGrid API Key

1. Log in to SendGrid dashboard
2. Go to Settings → API Keys
3. Click "Create API Key"
4. Name it (e.g., "n8n automation")
5. Select "Full Access" or "Restricted Access" with "Mail Send" permission
6. Copy the key immediately (you can't see it again)
7. Paste into n8n credentials

## SendGrid Node vs HTTP Request

**Use SendGrid Node when:**
- ✅ You want simple setup
- ✅ You want automatic authentication
- ✅ You want better error messages
- ✅ You're sending standard emails

**Use HTTP Request when:**
- ✅ You need advanced SendGrid features
- ✅ You're using SendGrid templates
- ✅ You need custom API calls
- ✅ SendGrid node isn't available in your n8n version

