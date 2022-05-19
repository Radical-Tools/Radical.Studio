using Radical.Studio.Server.SignalR.Application.Models;

namespace Radical.Studio.Server.SignalR.Application.Services;

public interface IWorkspaceService
{
    Task<Workspace?> GetWorkspaceById(Guid workspaceId);
    Task<Workspace> CreateWorkspaceAsync(string connectionId);
    Task RemoveWorkspaceAsync(Guid workspaceId);
}
