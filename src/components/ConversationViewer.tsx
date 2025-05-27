
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle, Clock, Phone, User, Search } from 'lucide-react';
import { fetchConversationData } from '../utils/api';

export const ConversationViewer = () => {
  const [conversationId, setConversationId] = useState('');
  const [searchId, setSearchId] = useState('');

  const { data: conversationData, isLoading, error } = useQuery({
    queryKey: ['conversation', searchId],
    queryFn: () => fetchConversationData(searchId),
    enabled: !!searchId,
  });

  const handleSearch = () => {
    if (conversationId.trim()) {
      setSearchId(conversationId.trim());
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-green-600" />
          Conversation Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter conversation ID"
            value={conversationId}
            onChange={(e) => setConversationId(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}

        {error && searchId && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-medium">Failed to load conversation</p>
            <p className="text-sm text-red-500 mt-1">{(error as Error).message}</p>
          </div>
        )}

        {conversationData?.data && (
          <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                Call ID: {conversationData.data.callId}
              </h3>
              <Badge 
                variant={conversationData.data.status === 'completed' ? 'default' : 'secondary'}
                className={conversationData.data.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
              >
                {conversationData.data.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Duration: {formatDuration(conversationData.data.duration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>Type: {conversationData.data.type}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Contact Details</h4>
              <div className="text-sm space-y-1">
                <p><span className="text-gray-600">From:</span> {conversationData.data.from}</p>
                <p><span className="text-gray-600">To:</span> {conversationData.data.to}</p>
              </div>
            </div>

            {conversationData.data.agent && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Agent Information
                </h4>
                <div className="text-sm space-y-1 bg-white p-3 rounded border">
                  <p><span className="font-medium">Name:</span> {conversationData.data.agent.name}</p>
                  <p><span className="font-medium">Description:</span> {conversationData.data.agent.description}</p>
                  <p><span className="font-medium">Model:</span> {conversationData.data.agent.slmModel}</p>
                  {conversationData.data.agent.synthesizer && (
                    <p><span className="font-medium">Voice:</span> {conversationData.data.agent.synthesizer.voiceConfig?.voiceId} ({conversationData.data.agent.synthesizer.voiceConfig?.gender})</p>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="text-center p-2 bg-white rounded">
                <p className="font-medium text-gray-900">{conversationData.data.average_transcriber_latency}ms</p>
                <p className="text-gray-600">Transcriber</p>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <p className="font-medium text-gray-900">{conversationData.data.average_agent_latency}ms</p>
                <p className="text-gray-600">Agent</p>
              </div>
              <div className="text-center p-2 bg-white rounded">
                <p className="font-medium text-gray-900">{conversationData.data.average_synthesizer_latency}ms</p>
                <p className="text-gray-600">Synthesizer</p>
              </div>
            </div>

            {conversationData.data.recordingUrl && (
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href={conversationData.data.recordingUrl} target="_blank" rel="noopener noreferrer">
                    View Recording
                  </a>
                </Button>
              </div>
            )}
          </div>
        )}

        {!searchId && (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Enter a conversation ID to view details</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
