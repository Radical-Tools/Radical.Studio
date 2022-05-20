using Ardalis.GuardClauses;

namespace Radical.Studio.Server.SignalR.Application.Messages;

public sealed class WorkspaceCreatedMessage : MessageBase
{
    public string WorkspaceId { get; }

    public WorkspaceCreatedMessage(string workspaceId)
    {
        WorkspaceId = Guard.Against.NullOrWhiteSpace(workspaceId, nameof(workspaceId));
    }
}
