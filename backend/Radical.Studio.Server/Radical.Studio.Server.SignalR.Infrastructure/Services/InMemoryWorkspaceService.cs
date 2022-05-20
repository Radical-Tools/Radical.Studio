using Radical.Studio.Server.SignalR.Application.Models;
using Radical.Studio.Server.SignalR.Application.Services;

namespace Radical.Studio.Server.SignalR.Infrastructure.Services;

public class InMemoryWorkspaceService : IWorkspaceService
{
    private readonly Dictionary<string, Workspace> _workspaces = new();

    public async Task<Workspace?> GetWorkspaceById(string workspaceId)
    {
        var isFound = _workspaces.TryGetValue(workspaceId, out var workspace);

        if (!isFound)
        {
            return null;
        }

        return await Task.FromResult(workspace);
    }

    public async Task<Workspace> CreateWorkspaceAsync(string connectionId, string workspaceId, string workspaceState)
    {
        var workspace = new Workspace(workspaceId, workspaceState, connectionId);

        var isAdded = _workspaces.TryAdd(workspaceId, workspace);

        if (!isAdded)
        {
            throw new Exception($"Failed to add workspace with id {workspaceId}");
        }

        return await Task.FromResult(workspace);
    }

    public async Task UpdateWorkspaceAsync(Workspace workspace)
    {
        var isFound = _workspaces.TryGetValue(workspace.Id, out _);

        if (isFound)
        {
            _workspaces[workspace.Id] = workspace;
        }

        await Task.CompletedTask;
    }

    public async Task RemoveWorkspaceAsync(string workspaceId)
    {
        _workspaces.Remove(workspaceId);

        await Task.CompletedTask;
    }
}
