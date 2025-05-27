
const API_BASE_URL = '/api/proxy';
const API_KEY = 'sk_838fd2ac51c4cca2f21afd84f40de303';

interface ApiResponse<T> {
  status: boolean;
  data: T;
}

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  authProvider: string;
  isEmailVerified: boolean;
  organizationId: string;
}

interface ConversationData {
  _id: string;
  callId: string;
  agent: {
    _id: string;
    name: string;
    description: string;
    organization: string;
    workflowId: string;
    createdBy: string;
    globalKnowledgeBaseId: string;
    language: {
      enabled: string;
      switching: boolean;
      supported: string[];
    };
    synthesizer: {
      voiceConfig: {
        model: string;
        voiceId: string;
        gender: string;
      };
      speed: number;
      consistency: number;
      similarity: number;
      enhancement: number;
    };
    slmModel: string;
    defaultVariables: Record<string, any>;
    createdAt: string;
    updatedAt: string;
  };
  status: string;
  duration: number;
  recordingUrl: string;
  from: string;
  to: string;
  transcript: any[];
  average_transcriber_latency: number;
  average_agent_latency: number;
  average_synthesizer_latency: number;
  type: string;
}

export const fetchUserData = async (): Promise<ApiResponse<UserData>> => {
  console.log('Fetching user data...');
  
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('User data received:', data);
  return data;
};

export const fetchConversationData = async (conversationId: string): Promise<ApiResponse<ConversationData>> => {
  console.log('Fetching conversation data for ID:', conversationId);
  
  const response = await fetch(`${API_BASE_URL}/conversation/${conversationId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch conversation data: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Conversation data received:', data);
  return data;
};
