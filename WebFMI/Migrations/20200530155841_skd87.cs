using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class skd87 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryTransactions_Categories_CategoryId",
                table: "CategoryTransactions");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "CategoryTransactions",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "CategoryTransactions",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryTransactions_Categories_CategoryId",
                table: "CategoryTransactions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryTransactions_Categories_CategoryId",
                table: "CategoryTransactions");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "CategoryTransactions");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "CategoryTransactions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryTransactions_Categories_CategoryId",
                table: "CategoryTransactions",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
