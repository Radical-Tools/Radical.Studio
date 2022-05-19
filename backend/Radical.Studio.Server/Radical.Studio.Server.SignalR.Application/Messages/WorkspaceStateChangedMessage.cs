using Ardalis.GuardClauses;

namespace Radical.Studio.Server.SignalR.Application.Messages;

public sealed class WorkspaceStateChangedMessage : MessageBase
{
    public string WorkspaceId { get; }

    public WorkspaceStateChangedMessage(string workspaceId)
    {
        WorkspaceId = Guard.Against.NullOrWhiteSpace(workspaceId, nameof(workspaceId));
    }

    public WorkspaceStateChangedMessage(string workspaceId, string exception) : base(false, exception)
    {
        WorkspaceId = Guard.Against.NullOrWhiteSpace(workspaceId, nameof(workspaceId));
    }
}
