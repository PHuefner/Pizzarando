public class Koch extends Thread{
    private String name, vorname;
    private int sterne;

    public Koch(String name, String vorname, int sterne){
        this.name = name;
        this.vorname = vorname;
        this.sterne = sterne;
    }

    @Override
    public void run() {
        
    }

    public boolean zubereiten(Bestellung b){
        return false;
    }
}
