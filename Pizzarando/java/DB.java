import java.sql.*;

public class DB{
    public static void main(String[] args) {
        //Verwaltung v = new Verwaltung();

        
        Connection conn;
        String dbURL = "jdbc:mysql://localhost:3306/pizzarando";
        String user = "root";
        String pass = "";
        Class.forName("com.mysql.jdbc.Driver");
        try {
            
            conn = DriverManager.getConnection(dbURL, user, pass);
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM Person;");

            while(rs.next()){
                System.out.println(rs.getString(1));
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}