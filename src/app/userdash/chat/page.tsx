"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, CheckCircle2, Clock, Send } from "lucide-react";
import { createEntryForChatOrStatus, getAllChatForActiveJobUser } from "@/app/server/serverUtils/jobs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type Sender = {
  name: string;
  role: "USER" | "SELLER";
};

const statusIcons = {
  IN_PROGRESS: <Clock className="h-5 w-5 text-yellow-500" />,
  UNDER_REVIEW: <CheckCircle2 className="h-5 w-5 text-green-500" />,
};

const statusLabels = {
  IN_PROGRESS: "In Progress",
  UNDER_REVIEW: "Give For Review",
};

export default function Component({ currentUser = { name: "", role: "USER" } }: { currentUser?: Sender }) {

  const scrollContainerRef = useRef(null);
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const [newMessage, setNewMessage] = useState("");

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['getAllChatForActiveJobUser'],
    queryFn: () => getAllChatForActiveJobUser(session?.user?.email),
    refetchOnWindowFocus: false, // This prevents refetch when switching tabs or focusing the window
  });

  const mutation = useMutation({
    mutationFn: createEntryForChatOrStatus,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['getAllChatForActiveJobUser'] });

      const previousChat = queryClient.getQueryData(['getAllChatForActiveJobUser']);

      if (newItem.type === "message") {
        queryClient.setQueryData(['getAllChatForActiveJobUser'], (old: any) => ({
          ...old,
          chatContent: [
            ...old.chatContent,
            {
              ...newItem,
              sender: { role: currentUser.role, name: currentUser.name },
              timestamp: new Date().toISOString(),
            },
          ],
        }));
      } else if (newItem.type === "statusChange") {
        queryClient.setQueryData(['getAllChatForActiveJobUser'], (old: any) => ({
          ...old,
          jobStatus: newItem.status,
        }));
      }

      return { previousChat };
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(['getAllChatForActiveJobUser'], context.previousChat);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllChatForActiveJobUser'] });
    },
  });
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.chatContent]);

  type newitem ={
    type: "message" | "statusChange";
    content?: string; // Only for messages
    status?: "IN_PROGRESS" | "UNDER_REVIEW"; // Only for status changes
    sender: string; // Sender's ID
    applicationId: number; // Application's ID
  }

  const handleSendMessage = (applicationId: number, userId: string) => {
    if (newMessage.trim()) {
      const newItem:newitem = {
        type: "message",
        content: newMessage.trim(),
        sender: userId,
        applicationId,
      };
      mutation.mutate(newItem);
      setNewMessage("");
    }
  };

  const handleStatusChange = (newStatus:"IN_PROGRESS" | "UNDER_REVIEW", userId: string, applicationId: number) => {
    const newItem:newitem = {
      type: "statusChange",
      status: newStatus,
      sender: userId,
      applicationId,
    };
    mutation.mutate(newItem);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (isLoading || isFetching || status === "loading" || mutation.isPending) {
    return (
      <div className="flex flex-col h-screen w-full justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col h-[600px] max-w-4xl mx-auto border rounded-lg shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Job Timeline</h2>
          <div className="flex items-center mt-2">
            <span className="mr-2">Current Status:</span>
            {statusIcons[data?.jobStatus]}
            <span className="ml-1">{statusLabels[data?.jobStatus!]}</span>
          </div>
          <div className="flex mt-4 space-x-2">
            <Button
              onClick={() => handleStatusChange("IN_PROGRESS", data?.userId, data?.applicationId)}
              variant={data?.jobStatus === "IN_PROGRESS" ? "default" : "outline"}
              size="sm"
              disabled={data?.jobStatus === "IN_PROGRESS"? true:false}
            >
              In Progress
            </Button>
            <Button
              onClick={() => handleStatusChange("UNDER_REVIEW", data?.userId, data?.applicationId)}
              variant={data?.jobStatus === "UNDER_REVIEW" ? "default" : "outline"}
              size="sm"
              disabled={data?.jobStatus === "UNDER_REVIEW"? true:false}
            >
              Send For Review
            </Button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="flex-grow p-4 overflow-y-auto">
          <div className="space-y-8 relative" >
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"  />
            {data?.chatContent.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  item.sender.role === "SELLER" ? "justify-start" : "justify-end"
                }`}
              >
                {item.sender.role === "SELLER" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                  </div>
                )}
                <div
                  className={`relative ${
                    item.type === "statusChange" ? "mx-auto" : ""
                  } ${item.sender.role === currentUser.role ? "order-1" : ""}`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      item.type === "statusChange"
                        ? "bg-gray-100 text-gray-700"
                        : item.sender.role === currentUser.role
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {item.type === "statusChange" ? (
                      <div className="flex items-center">
                        {statusIcons[item.status!]}
                        <span className="ml-2">Status changed to: {statusLabels[item.status!]}</span>
                      </div>
                    ) : (
                      <p>{item.content}</p>
                    )}
                  </div>
                  <span
                    className={`block text-xs ${
                      item.sender.role === currentUser.role ? "text-right" : "text-left"
                    } mt-1 text-gray-500`}
                  >
                    {item.sender.name} - {formatTimestamp(item.timestamp)}
                  </span>
                </div>
                {item.sender.role === "USER" && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4 ">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button onClick={() => handleSendMessage(data?.applicationId, data?.userId)}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
