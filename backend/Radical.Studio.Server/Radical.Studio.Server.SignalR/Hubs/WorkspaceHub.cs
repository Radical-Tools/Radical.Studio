using Microsoft.AspNetCore.SignalR;
using Radical.Studio.Server.SignalR.Application.Messages;
using Radical.Studio.Server.SignalR.Application.Services;

namespace Radical.Studio.Server.SignalR.Hubs;

public class WorkspaceHub : Hub
{
    private readonly ILogger<WorkspaceHub> _logger;
    private readonly IWorkspaceService _workspaceService;

    public WorkspaceHub(ILogger<WorkspaceHub> logger, IWorkspaceService workspaceService)
    {
        _logger = logger;
        _workspaceService = workspaceService;
    }

    public async Task<WorkspaceCreatedMessage> CreateWorkspace(string workspaceId, string workspaceState)
    {
        var workspace = await _workspaceService.CreateWorkspaceAsync(Context.ConnectionId, workspaceId, workspaceState);

        await Groups.AddToGroupAsync(Context.ConnectionId, workspace.Id);

        _logger.LogInformation($"User {Context.ConnectionId} created and joined to group {workspace.Id}.");

        return new WorkspaceCreatedMessage(workspace.Id);
    }

    public async Task<WorkspaceRemovedMessage> RemoveWorkspace(string workspaceId)
    {
        var workspace = await _workspaceService.GetWorkspaceById(workspaceId);

        if (workspace is null)
        {
            _logger.LogWarning($"User {Context.ConnectionId} could not find workspace {workspaceId}.");

            return new WorkspaceRemovedMessage(
                string.Empty,
                $"User {Context.ConnectionId} could not find workspace {workspaceId}."
            );
        }

        if (workspace.OwnerConnectionId != Context.ConnectionId)
        {
            _logger.LogWarning($"User {Context.ConnectionId} want to remove group {workspaceId}, but is not an owner.");

            return new WorkspaceRemovedMessage(
                string.Empty,
                $"User {Context.ConnectionId} want to remove group {workspaceId}, but is not an owner."
            );
        }

        await Clients.Group(workspaceId).SendAsync("WorkspaceRemoved");

        await _workspaceService.RemoveWorkspaceAsync(workspaceId);

        _logger.LogInformation($"User {Context.ConnectionId} removed group {workspaceId}.");

        return new WorkspaceRemovedMessage(workspaceId);
    }

    public async Task<WorkspaceJoinedMessage> JoinWorkspace(string workspaceId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, workspaceId);

        var workspace = await _workspaceService.GetWorkspaceById(workspaceId);

        if (workspace is null)
        {
            _logger.LogWarning($"User {Context.ConnectionId} could not find workspace {workspaceId}.");

            return new WorkspaceJoinedMessage(
                string.Empty,
                $"User {Context.ConnectionId} could not find workspace {workspaceId}."
            );
        }

        _logger.LogInformation($"User {Context.ConnectionId} joined to group {workspaceId}.");

        return new WorkspaceJoinedMessage(workspace.State);
    }

    public async Task<WorkspaceLeftMessage> LeaveWorkspace(string workspaceId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, workspaceId);

        _logger.LogInformation($"User {Context.ConnectionId} left group {workspaceId}.");

        return new WorkspaceLeftMessage();
    }

    public async Task<WorkspaceStateChangedMessage> WorkspaceStateChanged(string workspaceId, string workspaceState)
    {
        var workspace = await _workspaceService.GetWorkspaceById(workspaceId);

        if (workspace is null)
        {
            _logger.LogWarning($"User {Context.ConnectionId} could not find workspace {workspaceId}.");

            return new WorkspaceStateChangedMessage(
                string.Empty,
                $"User {Context.ConnectionId} could not find workspace {workspaceId}."
            );
        }

        workspace.SetState(workspaceState);

        await _workspaceService.UpdateWorkspaceAsync(workspace);

        await Clients.OthersInGroup(workspaceId).SendAsync("ReloadWorkspaceState", workspaceState);

        _logger.LogInformation($"Workspace {workspaceId} state changed.");

        return new WorkspaceStateChangedMessage(workspaceId);
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();

        _logger.LogInformation($"User {Context.ConnectionId} connected.");
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await base.OnDisconnectedAsync(exception);

        _logger.LogInformation($"User {Context.ConnectionId} disconnected.");
    }
}
