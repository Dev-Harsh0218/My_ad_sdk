import 'dart:convert';
import 'package:ads_sdk_application/ads/ApiController.dart';
import 'package:ads_sdk_application/ads/video_player.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

class AlertDialogueModal extends StatefulWidget {
  final String serverUrl;
  final String apkUniqueKey;
  final String app_id;
  const AlertDialogueModal({super.key, required this.serverUrl, required this.apkUniqueKey, required this.app_id});

  @override
  State<AlertDialogueModal> createState() => _AlertDialogueModalState();
}

class _AlertDialogueModalState extends State<AlertDialogueModal> {
  String randomImage = '';
  bool isBlack = true;
  Map<String, dynamic> imageData = {};
  late Future<Map<String, dynamic>> _futureData;

  @override
  void initState() {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    _futureData = ApiServices().fetchData(widget.app_id, widget.serverUrl);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        if (MediaQuery.of(context).viewInsets.bottom > 0) {
          SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
          return false;
        }
        return false;
      },
      child: FutureBuilder(
        future: _futureData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            String imageData = snapshot.data!['randomImage'];
            String appUrl = snapshot.data!['appurl'];
            String ad_id = snapshot.data!['ad_id'];
            print("\n====================\n imageData: $imageData\n appUrl : $appUrl\n ad_id: $ad_id \n=================\n");
            return Stack(
              children: [
                GestureDetector(
                  onTap: () async {
                    await launchUrl(Uri.parse(appUrl));
                    await ApiServices().incrementAdClickCount(ad_id, widget.serverUrl);
                  },
                  child: Container(
                    width: double.maxFinite,
                    height: double.maxFinite,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: imageData.endsWith('mp4')
                        ? VideoApp(videoUrl: imageData, serverUrl: widget.serverUrl)
                        : Image.network(
                            'http://${widget.serverUrl}/images/$imageData',
                            fit: BoxFit.cover,
                            loadingBuilder: (BuildContext context, Widget child, ImageChunkEvent? loadingProgress) {
                              if (loadingProgress == null) return child;
                              return Center(
                                child: CircularProgressIndicator(
                                  value: loadingProgress.expectedTotalBytes != null
                                      ? loadingProgress.cumulativeBytesLoaded / loadingProgress.expectedTotalBytes!
                                      : null,
                                ),
                              );
                            },
                            errorBuilder: (BuildContext context, Object exception, StackTrace? stackTrace) {
                              return const Center(
                                child: Icon(Icons.error, size: 50, color: Colors.red),
                              );
                            },
                          ),
                  ),
                ),
                SafeArea(
                  child: Align(
                    alignment: Alignment.topRight,
                    child: GestureDetector(
                      onTap: () {
                        SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
                        setState(() {});
                        Navigator.pop(context);
                      },
                      child: Container(
                        margin: const EdgeInsets.fromLTRB(0, 0, 15, 0),
                        child: Icon(
                          Icons.cancel_outlined,
                          color: snapshot.data!['isBlack'] == 0 ? Colors.white : Colors.black,
                          size: 40,
                        ),
                      ),
                    ),
                  ),
                )
              ],
            );
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}

// import 'dart:convert';
// // import 'package:ads_sdk/ads/video_player.dart';
// import 'package:ads_sdk_application/ads/ApiController.dart';
// import 'package:ads_sdk_application/ads/video_player.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
// import 'package:http/http.dart' as http;
// import 'package:url_launcher/url_launcher.dart';

// class AlertDialogueModal extends StatefulWidget {
//   final String serverUrl;
//   final String apkUniqueKey;
//   final String app_id;
//   const AlertDialogueModal({super.key, required this.serverUrl, required this.apkUniqueKey,required this.app_id});

//   @override
//   State<AlertDialogueModal> createState() => _AlertDialogueModalState();
// }

// class _AlertDialogueModalState extends State<AlertDialogueModal> {
//   String randomImage = '';
//   bool isBlack = true;
//   Map<String, dynamic> imageData = {};
//   late Future<Map<String, dynamic>> _futureData;

//   @override
//   void initState() {
//     SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
//     // _futureData = ApiServices().fetchData(widget.apkUniqueKey,widget.serverUrl);
//     _futureData = ApiServices().fetchData(widget.app_id,widget.serverUrl);
//     super.initState();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return WillPopScope(
//         onWillPop: () async {
//           if (MediaQuery.of(context).viewInsets.bottom > 0) {
//             SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
//             return false;
//           }
//           return false;
//         },
//         child: FutureBuilder(
//           future:_futureData,
//           builder: (context, snapshot) {
//             if (snapshot.connectionState == ConnectionState.done) {
//               String imageData = snapshot.data!['randomImage'];
//               String appUrl = snapshot.data!['appurl'];
//               String ad_id = snapshot.data!['ad_id'];
//               print("\n====================\n imageData: $imageData\n appUrl : $appUrl\n ad_id: $ad_id \n=================\n");
//               // String trimmedPath = imageData.replaceAll('.png', '');
//               return Stack(
//                 children: [
//                   GestureDetector(
//                     onTap: () async {
//                       await launchUrl(Uri.parse(appUrl));
//                       await ApiServices().incrementAdClickCount(ad_id,widget.serverUrl);
//                     },
//                     child: Container(
//                       width: double.maxFinite,
//                       height: double.maxFinite,
//                       decoration: BoxDecoration(
//                         borderRadius: BorderRadius.circular(20),
//                       ),
//                       child: imageData.endsWith('mp4')
//                           ? VideoApp(videoUrl: imageData,serverUrl: widget.serverUrl,)
//                           : Container(
//                               decoration: BoxDecoration(
//                                 image: DecorationImage(

//                                     // image:
//                                      image: NetworkImage(
//                                          'http://${widget.serverUrl}/images/$imageData'),
//                                     fit: BoxFit.cover),
//                               ),
//                             ),
//                     ),
//                   ),
//                   SafeArea(
//                     child: Align(
//                       alignment: Alignment.topRight,
//                       child: GestureDetector(
//                         onTap: () {
//                           SystemChrome.setEnabledSystemUIMode(
//                               SystemUiMode.edgeToEdge);
//                           setState(() {});
//                           Navigator.pop(context);
//                         },
//                         child: Container(
//                           margin: const EdgeInsets.fromLTRB(0, 0, 15, 0),
//                           child: Icon(
//                             Icons.cancel_outlined,
//                             color: snapshot.data!['isBlack'] == 0
//                                 ? Colors.white
//                                 : Colors.black,
//                             size: 40,
//                           ),
//                         ),
//                       ),
//                     ),
//                   )
//                 ],
//               );
//             }
//             return const Center(child: CircularProgressIndicator());
//           },
//         ));
//   }
// }
