using Radical.Studio.Server.SignalR.Application.Models;
using Radical.Studio.Server.SignalR.Application.Services;

namespace Radical.Studio.Server.SignalR.Infrastructure.Services;

public class InMemoryWorkspaceService : IWorkspaceService
{
    private readonly Dictionary<Guid, Workspace> _workspaces = new();

    public async Task<Workspace?> GetWorkspaceById(Guid workspaceId)
    {
        var isFound = _workspaces.TryGetValue(workspaceId, out var workspace);

        if (!isFound)
        {
            return null;
        }

        return await Task.FromResult(workspace);
    }

    public async Task<Workspace> CreateWorkspaceAsync(string connectionId)
    {
        var guid = Guid.NewGuid();

        var workspace = new Workspace(guid, connectionId);

        _workspaces.Add(workspace.Id, workspace);

        return await Task.FromResult(workspace);
    }

    public async Task RemoveWorkspaceAsync(Guid workspaceId)
    {
        _workspaces.Remove(workspaceId);

        await Task.CompletedTask;
    }
}
