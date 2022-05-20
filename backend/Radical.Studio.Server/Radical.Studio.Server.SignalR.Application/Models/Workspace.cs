using Ardalis.GuardClauses;

namespace Radical.Studio.Server.SignalR.Application.Models;

public class Workspace
{
    public string Id { get; }
    public string OwnerConnectionId { get; }
    public string State { get; private set; }

    public Workspace(string id, string state, string ownerConnectionId)
    {
        Id = Guard.Against.NullOrWhiteSpace(id, nameof(id));
        State = Guard.Against.NullOrWhiteSpace(state, nameof(state));
        OwnerConnectionId = Guard.Against.NullOrWhiteSpace(ownerConnectionId, nameof(ownerConnectionId));
    }

    public void SetState(string state)
    {
        State = Guard.Against.NullOrWhiteSpace(state, nameof(state));
    }
}
