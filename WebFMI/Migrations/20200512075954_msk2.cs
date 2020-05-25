using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class msk2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "CategoryTransactions");

            migrationBuilder.AddColumn<DateTime>(
                name: "TransactionDate",
                table: "CategoryTransactions",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransactionDate",
                table: "CategoryTransactions");

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "CategoryTransactions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
