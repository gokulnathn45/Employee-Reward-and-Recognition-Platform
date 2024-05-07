using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERRS.Migrations
{
    /// <inheritdoc />
    public partial class initialcreate5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_active",
                table: "Rewards",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "is_active",
                table: "Rewards");
        }
    }
}
