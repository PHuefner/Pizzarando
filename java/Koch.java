import java.sql.Time;
import java.util.ArrayList;

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
        while(Verwaltung.getGeoeffnet()){
            try {
                zubereiten(Verwaltung.entnehemen());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public boolean zubereiten(Bestellung b) throws InterruptedException{
        int menge = 0;
        int k = 300000;

        for(int i = 0; i < b.getBestellposition().size(); i++){
            menge += b.getBestellposition().get(i).getMenge();
        }
        sleep(menge * k * 1/(sterne * 1000));
        return true;
    }
}
