#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["stock.api/StockApi/StockApi.csproj", "stock.api/StockApi/"]
RUN dotnet restore "stock.api/StockApi/StockApi.csproj"
COPY . .
WORKDIR "/src/stock.api/StockApi"
RUN dotnet build "StockApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StockApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StockApi.dll"]