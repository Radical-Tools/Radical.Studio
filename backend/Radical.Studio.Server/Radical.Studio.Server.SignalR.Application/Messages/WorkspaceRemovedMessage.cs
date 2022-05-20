using Ardalis.GuardClauses;

namespace Radical.Studio.Server.SignalR.Application.Messages;

public sealed class WorkspaceRemovedMessage : MessageBase
{
    public string WorkspaceId { get; }

    public WorkspaceRemovedMessage(string workspaceId)
    {
        WorkspaceId = Guard.Against.NullOrWhiteSpace(workspaceId, nameof(workspaceId));
    }

    public WorkspaceRemovedMessage(string workspaceId, string exception) : base(false, exception)
    {
        WorkspaceId = Guard.Against.NullOrWhiteSpace(workspaceId, nameof(workspaceId));
    }
}
