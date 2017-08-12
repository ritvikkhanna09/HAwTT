package ritvikkhanna.hawtt;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.Calendar;

public class MainActivity extends AppCompatActivity {
    String user_name,greeting_msg;
    TextView greeting_textView,name_textView;
    ImageView Button_iv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        greeting_textView=(TextView)findViewById(R.id.greeting_text);
        name_textView=(TextView)findViewById(R.id.name_text);
        Intent i=getIntent();
        user_name= i.getStringExtra("user_name");
        greeting_msg=getGreetingMassage();
        name_textView.setText(user_name);
        greeting_textView.setText(greeting_msg);
        Button_iv=(ImageView) findViewById(R.id.mirror_switch);
        Button_iv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                
            }
        });

    }

    String getGreetingMassage(){
        Calendar c = Calendar.getInstance();
        int timeOfDay = c.get(Calendar.HOUR_OF_DAY);
        if(timeOfDay >= 0 && timeOfDay < 12){
            return "Good Morning";
        }else if(timeOfDay >= 12 && timeOfDay < 16){
            return "Good Afternoon";
        }else if(timeOfDay >= 16 && timeOfDay < 21){
            return "Good Evening";
        }else if(timeOfDay >= 21 && timeOfDay < 24){
            return "Good Night";
        }
        return null;
    }
}
