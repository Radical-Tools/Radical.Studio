namespace Radical.Studio.Server.SignalR.Application.Models;

public class Workspace
{
    public Guid Id { get; }
    public string OwnerConnectionId { get; }

    public Workspace(Guid id, string ownerConnectionId)
    {
        if (string.IsNullOrWhiteSpace(id.ToString()))
        {
            throw new ArgumentException("Id cannot be empty.", nameof(id));
        }

        if (string.IsNullOrWhiteSpace(ownerConnectionId))
        {
            throw new ArgumentException("OwnerConnectionId cannot be empty.", nameof(OwnerConnectionId));
        }

        Id = id;
        OwnerConnectionId = ownerConnectionId;
    }
}
