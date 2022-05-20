using Radical.Studio.Server.SignalR.Application.Models;

namespace Radical.Studio.Server.SignalR.Application.Services;

public interface IWorkspaceService
{
    Task<Workspace?> GetWorkspaceById(string workspaceId);
    Task<Workspace> CreateWorkspaceAsync(string connectionId, string workspaceId, string workspaceState);
    Task UpdateWorkspaceAsync(Workspace workspace);
    Task RemoveWorkspaceAsync(string workspaceId);
}
