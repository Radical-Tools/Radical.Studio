using Microsoft.AspNetCore.SignalR;
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

    public async Task CreateWorkspace()
    {
        var workspace = await _workspaceService.CreateWorkspaceAsync(Context.ConnectionId);

        await Groups.AddToGroupAsync(Context.ConnectionId, workspace.Id.ToString());

        await Clients.Caller.SendAsync("WorkspaceCreated", workspace.Id);

        _logger.LogInformation($"User {Context.ConnectionId} created and joined to group {workspace.Id}.");
    }

    public async Task RemoveWorkspace(Guid workspaceId)
    {
        var workspace = await _workspaceService.GetWorkspaceById(workspaceId);

        if (workspace is null)
        {
            _logger.LogWarning($"User {Context.ConnectionId} could not find workspace {workspaceId}.");
            return;
        }

        if (workspace.OwnerConnectionId != Context.ConnectionId)
        {
            _logger.LogWarning($"User {Context.ConnectionId} want to remove group {workspaceId}, but is not an owner.");
            return;
        }

        await Clients.Group(workspaceId.ToString()).SendAsync("LeaveWorkspace");

        await Clients.Caller.SendAsync("WorkspaceRemoved", workspace.Id);

        await _workspaceService.RemoveWorkspaceAsync(workspaceId);

        _logger.LogInformation($"User {Context.ConnectionId} removed group {workspaceId}.");
    }

    public async Task JoinWorkspace(Guid workspaceId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, workspaceId.ToString());
        _logger.LogInformation($"User {Context.ConnectionId} joined to group {workspaceId}.");
    }

    public async Task LeaveWorkspace(Guid workspaceId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, workspaceId.ToString());
        _logger.LogInformation($"User {Context.ConnectionId} left group {workspaceId}.");
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
