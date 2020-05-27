using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class _23945s : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "CategoryTransactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "CategoryTransactions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "CategoryTransactions");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "CategoryTransactions");
        }
    }
}
