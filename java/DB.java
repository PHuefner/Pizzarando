import java.sql.*;
import java.util.ArrayList;
public class DB{
    private static Statement statement;
    public static void main(String[] args) {
        //Verwaltung v = new Verwaltung();
        
        Connection conn;
        String dbURL = "jdbc:mysql://localhost:3306/pizzarando";
        String user = "root";
        String pass = "";
        

        try {
            //Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(dbURL, user, pass);
            statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM Person;");
            
            while(rs.next()){
                System.out.println(rs.getString(1));
            }
        } catch (Exception e) {
            System.out.println(e);
        }



    }

    public Koch getKoeche() throws Exception {
        ResultSet k = statement.executeQuery("SELECT * FROM Koeche ;");
        ArrayList<Koch> kochs = new ArrayList<>();
        while(k.next()){
            kochs.add(new Koch(name, vorname, sterne));
            k.getString(columnIndex);
            System.out.println(k.getString(1));
        }
        return null;
    }
}