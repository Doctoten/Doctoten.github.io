---
layout: post
title: "Thiết lập Homelab đầu tiên"
date: 2026-10-11 19:00:00 +1000
categories: [Home Lab]
tags: [IT]
description: "Quá trình thiết lập homelab bằng Proxmox."
---

## Giới thiệu

![ ](/assets/images/prox.png)

# Bắt đầu homelab với Lenovo ThinkCentre và Proxmox VE

Trong bài này, mình chia sẻ cách cài Proxmox VE lên một chiếc Lenovo ThinkCentre để bắt đầu xây dựng homelab tại nhà. Đây cũng là nền tảng mình đang dùng để quản lý các máy ảo và thử nghiệm những dịch vụ tự host.

Hệ thống hiện tại của mình có Home Assistant, AdGuard Home, máy chủ in và Minecraft. Mỗi dịch vụ có cách cấu hình riêng, nên mình sẽ chia thành từng bài để các bạn dễ theo dõi. Bài đầu tiên bắt đầu từ việc cài Proxmox và truy cập giao diện quản trị.

## Proxmox dùng để làm gì?

Các bạn có thể hiểu đơn giản là Proxmox giúp một máy tính chạy nhiều máy ảo hoặc container. Thay vì cài một hệ điều hành và dùng toàn bộ máy cho một dịch vụ, chúng ta có thể chia tài nguyên cho nhiều môi trường khác nhau.

Ví dụ, một máy ảo chạy Home Assistant, còn một máy ảo khác làm máy chủ in. Chúng vẫn dùng chung phần cứng nhưng có hệ điều hành và cấu hình riêng.

Với mình, homelab còn là nơi thực hành: cài hệ điều hành, cấu hình mạng, triển khai dịch vụ và tìm nguyên nhân khi có lỗi.

## Phần cứng mình đang dùng

Máy của mình là Lenovo ThinkCentre, với cấu hình hiện tại:

- CPU: Intel Core i5-6400T, 4 nhân.
- RAM: 16 GB.
- Proxmox VE: 9.2.18 tại thời điểm viết bài.

Đây là cấu hình của hệ thống mình đang sử dụng, các bạn không nhất thiết phải chọn đúng máy như vậy. Quan trọng là phần cứng hỗ trợ ảo hóa và có đủ tài nguyên cho những dịch vụ muốn chạy.

![ ](/assets/images/image.png)

## Chuẩn bị trước khi cài

Chúng ta cần USB để tạo bộ cài, màn hình và bàn phím cho bước thiết lập ban đầu. Mình cũng khuyên dùng kết nối Ethernet để việc cấu hình mạng thuận tiện hơn.

Trong BIOS/UEFI, kiểm tra và bật tính năng ảo hóa của CPU. Trên máy Intel, tùy hãng, mục này có thể mang tên Intel Virtualization Technology hoặc VT-x.

**Lưu ý:** bộ cài sẽ xóa dữ liệu trên ổ được chọn. Các bạn nên sao lưu dữ liệu và kiểm tra đúng ổ trước khi tiếp tục.

## Tải bộ cài và tạo USB

Các bạn tải **Proxmox VE Installer ISO** từ trang chính thức:

https://www.proxmox.com/en/downloads

Sau đó dùng phần mềm ghi image để tạo USB cài đặt. Việc này khác với chép file ISO vào USB: phần mềm cần ghi image để máy có thể khởi động từ USB.

Khi hoàn tất, cắm USB vào ThinkCentre và chọn khởi động từ USB trong Boot Menu.

## Cài đặt Proxmox

Ở màn hình khởi động, chọn **Install Proxmox VE (Graphical)**. Nếu giao diện đồ họa gặp lỗi, có thể thử **Terminal UI**.

Tiếp theo, đọc điều khoản, chọn ổ cài đặt và thiết lập quốc gia, múi giờ, bàn phím. Với các bạn ở Brisbane như mình, múi giờ là **Australia/Brisbane**.

Tạo mật khẩu cho tài khoản `root` và nhập email quản trị. Đây là tài khoản dùng để đăng nhập quản lý hệ thống sau khi cài.

## Thiết lập mạng

Phần này nên làm cẩn thận vì chúng ta sẽ dùng địa chỉ IP để truy cập Proxmox.

Các thông tin cần có gồm:

- **Management Interface:** cổng Ethernet đang kết nối.
- **Hostname:** tên máy chủ.
- **IP Address:** địa chỉ quản trị.
- **Gateway:** địa chỉ router.
- **DNS Server:** máy chủ phân giải tên miền.

Ví dụ, với mạng `192.168.1.0/24`, có thể dùng IP quản trị `192.168.1.10/24` và gateway `192.168.1.1`.

Đây chỉ là ví dụ. Các bạn cần chọn IP chưa có thiết bị sử dụng và dành riêng địa chỉ đó trong cấu hình DHCP của router để tránh trùng IP.

Kiểm tra lại thông tin trên màn hình tổng hợp, sau đó bắt đầu cài đặt. Khi hoàn tất, tháo USB và khởi động lại.

## Truy cập giao diện quản trị

Từ một máy khác trong cùng mạng, mở trình duyệt và nhập:

`https://IP-của-Proxmox:8006`

Đăng nhập bằng tài khoản `root`, mật khẩu đã đặt và chọn realm **Linux PAM standard authentication**.

Sau khi đăng nhập, chọn node rồi mở **Summary** để kiểm tra CPU, RAM và phiên bản phần mềm.

*![Dashboard Proxmox trên Lenovo ThinkCentre](/assets/images/proxmox.png)*

Trong **System → Network**, các bạn sẽ thấy cấu hình mạng của host. Bridge `vmbr0` đóng vai trò như một switch ảo, giúp máy ảo kết nối với mạng vật lý.

*![Network của mình](/assets/images/net.jpg)*

## Hệ thống hiện tại của mình

Ảnh Summary phía trên là hệ thống mình đang sử dụng, không phải một bản cài thử trống. Danh sách bên trái đã có các môi trường dành cho Minecraft, máy chủ in, AdGuard Home và Home Assistant.

Mình sẽ viết riêng quá trình triển khai từng dịch vụ, gồm cấu hình, cách kiểm tra hoạt động và những lỗi thực tế đã gặp. Như vậy, các bạn có thể theo dõi từ một máy Proxmox ban đầu đến những dịch vụ sử dụng được trong mạng gia đình.

## Những gì mình đã làm

- Cài Proxmox.
- Tạo máy ảo.
- Cấu hình mạng.