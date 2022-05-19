using Ardalis.GuardClauses;

namespace Radical.Studio.Server.SignalR.Application.Messages;

public sealed class WorkspaceJoinedMessage : MessageBase
{
    public string WorkspaceState { get; }

    public WorkspaceJoinedMessage(string workspaceState)
    {
        WorkspaceState = Guard.Against.NullOrWhiteSpace(workspaceState, nameof(workspaceState));
    }

    public WorkspaceJoinedMessage(string workspaceState, string exception) : base(false, exception)
    {
        WorkspaceState = Guard.Against.NullOrWhiteSpace(workspaceState, nameof(workspaceState));
    }
}
