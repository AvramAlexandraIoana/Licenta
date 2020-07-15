using Microsoft.EntityFrameworkCore.Migrations;

namespace WebFMI.Migrations
{
    public partial class m92832523 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LimitationCategories_Categories_CategoryId",
                table: "LimitationCategories");

            migrationBuilder.DropIndex(
                name: "IX_LimitationCategories_CategoryId",
                table: "LimitationCategories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_LimitationCategories_CategoryId",
                table: "LimitationCategories",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_LimitationCategories_Categories_CategoryId",
                table: "LimitationCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
