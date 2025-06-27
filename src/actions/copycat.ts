import {
    Content,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    type Action,
  } from "@elizaos/core";
  
  export const copycatAction: Action = {
    name: "COPYCAT_REPLY",
    similes: ["ECHO", "MIRROR", "REPEAT"],
    description: "Reply with the exact same message received, minus the bot handle",
    
    validate: async (runtime: IAgentRuntime, message: Memory) => {
      // Check if this is a Twitter mention
      const isTwitter = message.content.source === "twitter";
      const botHandle = `@${runtime.character?.username || runtime.character?.name}`;
      const hasMention = message.content.text?.includes(botHandle);
      
      // Only validate if it's a Twitter mention and not from the bot itself
      const isNotSelf = message.userId !== runtime.agentId;
      
      return isTwitter && hasMention && isNotSelf;
    },
  
    handler: async (
      runtime: IAgentRuntime,
      message: Memory,
      state: State,
      _options: { [key: string]: unknown },
      callback?: HandlerCallback
    ) => {
      try {
        const originalText = message.content.text || "";
        const botHandle = `@${runtime.character?.username || runtime.character?.name}`;
        
        // Remove bot handle from the message (case insensitive)
        // Also remove any leading/trailing whitespace and normalize spaces
        let replyText = originalText
          .replace(new RegExp(botHandle, 'gi'), '')
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .trim();
        
        // If message is empty after removing handle, use a default response
        if (!replyText) {
          replyText = "👋";
        }
  
        // Create the reply content
        const replyContent: Content = {
          text: replyText,
          source: message.content.source,
          inReplyTo: message.id,
        };
  
        // Log the action for debugging
        console.log(`Copycat replying to: "${originalText}" with: "${replyText}"`);
  
        // Execute the reply
        if (callback) {
          callback(replyContent);
        }
  
        return true;
      } catch (error) {
        console.error("Error in copycat action:", error);
        return false;
      }
    },
  
    examples: [
      [
        {
          user: "{{user1}}",
          content: {
            text: "@copycat_bot Hello world!",
            source: "twitter"
          },
        },
        {
          user: "{{user2}}",
          content: {
            text: "Hello world!",
            action: "COPYCAT_REPLY",
            source: "twitter"
          },
        },
      ],
      [
        {
          user: "{{user1}}",
          content: {
            text: "@copycat_bot Are you real?",
            source: "twitter"
          },
        },
        {
          user: "{{user2}}",
          content: {
            text: "Are you real?",
            action: "COPYCAT_REPLY",
            source: "twitter"
          },
        },
      ],
      [
        {
          user: "{{user1}}",
          content: {
            text: "@copycat_bot",
            source: "twitter"
          },
        },
        {
          user: "{{user2}}",
          content: {
            text: "👋",
            action: "COPYCAT_REPLY",
            source: "twitter"
          },
        },
      ],
    ],
  };