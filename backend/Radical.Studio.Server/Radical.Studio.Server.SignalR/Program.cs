using Radical.Studio.Server.SignalR.Application.Services;
using Radical.Studio.Server.SignalR.Hubs;
using Radical.Studio.Server.SignalR.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IWorkspaceService, InMemoryWorkspaceService>();

builder.Services.AddSignalR();

var app = builder.Build();

app.MapHub<WorkspaceHub>("/workspace");

app.Run();
